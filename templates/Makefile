##############################################################################
#
# Project settings
#
##############################################################################


SOURCE_DIR  = ../../../../..
PWD         = $(shell pwd)
SDK_PATH    = $(abspath $(PWD)/$(SOURCE_DIR))
DATIME      = $(shell date --iso=seconds)
V          ?= 0

##############################################################################
#
# build log output
#
##############################################################################


ifeq ($(V),0)
Q           = @
else
Q           =
endif


##############################################################################
#
# config files
#
##############################################################################


FEATURE    ?= feature.mk

include $(FEATURE)

# Gloabl Config
-include $(SOURCE_DIR)/.config
# IC Config
-include $(SOURCE_DIR)/config/chip/$(IC_CONFIG)/chip.mk
# Board Config
-include $(SOURCE_DIR)/config/board/$(BOARD_CONFIG)/board.mk
# HAL driver files
include $(SOURCE_DIR)/driver/chip/mt7687/module.mk

# EPT Config
-include $(SOURCE_DIR)/driver/board/mt76x7_hdk/ept/module.mk
# Minisupp Config
-include $(SOURCE_DIR)/middleware/MTK/minisupp/module.mk
ifeq ($(MTK_SMTCN_ENABLE),y)
-include $(SOURCE_DIR)/middleware/MTK/smtcn/module.mk
endif
##############################################################################
#
# Project specific features
#
##############################################################################


ifeq ($(MTK_CLI_EXAMPLE_MODE_ENABLE),y)
CFLAGS         += -DMTK_CLI_EXAMPLE_MODE_ENABLE
endif


##############################################################################
#
# config
#
##############################################################################


RAM_BOOTING     = 0

DEBUG           = 0
FLOAT_TYPE      = hard
BUILD_DIR       = $(PWD)/Build

# Project name
PROJ_NAME       = $(notdir $(abspath $(dir $(PWD))))
PROJ_PATH       = $(PWD)
OUTPATH         = $(PWD)/Build

# Main APP files
APP_PATH        = $(patsubst $(SDK_PATH)/%,%,$(abspath $(dir $(PWD))))
APP_PATH_SRC    = $(APP_PATH)/src


##############################################################################
#
# SDK source files
#
##############################################################################
#include lwip
include $(SOURCE_DIR)/middleware/third_party/lwip/module.mk

#include ping
include $(SOURCE_DIR)/middleware/third_party/ping/module.mk

#include iperf
include $(SOURCE_DIR)/middleware/MTK/iperf/module.mk

#include dhcpd
include $(SOURCE_DIR)/middleware/third_party/dhcpd/module.mk

# httpclient
include $(SOURCE_DIR)/middleware/third_party/httpclient/module.mk

# wifi src
include $(SOURCE_DIR)/driver/board/mt76x7_hdk/wifi/module.mk

# fota
include $(SOURCE_DIR)/middleware/MTK/fota/module.mk

#cjson
include $(SOURCE_DIR)/middleware/third_party/cjson/module.mk

APP_FILES       = $(APP_PATH_SRC)/main.c     \
                  $(APP_PATH_SRC)/wifi_lwip_helper.c \
                  $(APP_PATH)/GCC/syscalls.c \
                  $(APP_PATH_SRC)/sys_init.c \

ifeq ($(MTK_MINICLI_ENABLE),y)
APP_FILES       += driver/board/mt76x7_hdk/util/src/io_def.c
endif

ifeq ($(MTK_JR_ENABLE),y)
APP_FILES       += $(APP_PATH_SRC)/jerry_run.c
APP_FILES 			+= $(APP_PATH_SRC)/jerry-port.c
endif

# APP_FILES       += $(APP_PATH_SRC)/mcs_tcp.c

APP_FILES       += $(APP_PATH_SRC)/ept_gpio_var.c
APP_FILES       += $(APP_PATH_SRC)/ept_eint_var.c

SYS_FILES       = $(APP_PATH_SRC)/system_mt7687.c

ifeq ($(MTK_MINICLI_ENABLE),y)
APP_FILES       += $(APP_PATH_SRC)/cli_def.c
APP_FILES       += $(APP_PATH_SRC)/cli_cmds.c
endif

C_FILES         += $(APP_FILES) $(SYS_FILES)


S_FILES         += $(APP_PATH)/GCC/startup_mt7687.s

##############################################################################
#
# SDK object files
#
##############################################################################


C_OBJS          = $(C_FILES:%.c=$(BUILD_DIR)/%.o)
CXX_OBJS        = $(CXX_FILES:%.cpp=$(BUILD_DIR)/%.o)
S_OBJS          = $(S_FILES:%.s=$(BUILD_DIR)/%.o)
CXX_OBJS        = $(CXX_FILES:%.cpp=$(BUILD_DIR)/%.o)


##############################################################################
#
# CFLAGS
#
##############################################################################


CFLAGS += -DMTK_FW_VERSION=\"$(MTK_FW_VERSION)\"


###################################################
# include path
CFLAGS += -I$(SOURCE_DIR)/$(APP_PATH)/inc
CFLAGS += -I$(SOURCE_DIR)/driver/chip/$(IC_CONFIG)/inc
CFLAGS += -I$(SOURCE_DIR)/driver/chip/inc
CFLAGS += -I$(SOURCE_DIR)/driver/board/mt76x7_hdk/wifi/inc
CFLAGS += -I$(SOURCE_DIR)/driver/board/mt76x7_hdk/ept/inc

##############################################################################
#
# LDFLAGS
#
##############################################################################


LDFLAGS += $(ALLFLAGS) $(FPUFLAGS) --specs=nano.specs -lnosys -nostartfiles
LDFLAGS += -Wl,-wrap=malloc -Wl,-wrap=calloc -Wl,-wrap=realloc -Wl,-wrap=free
LDFLAGS += -u _printf_float -u _scanf_float

ifeq ($(RAM_BOOTING), 1)
LDFLAGS += -Wl,-Tmt7687_sram.ld -Wl,--gc-sections
else
LDFLAGS += -Wl,-Tmt7687_flash.ld -Wl,--gc-sections
endif

ifneq ($(MTK_DEBUG_LEVEL), none)
LDFLAGS += -Wl,-wrap=printf
endif


##############################################################################
#
# Libraries
#
##############################################################################

include $(SOURCE_DIR)/project/common/bsp_ex/module.mk
include $(SOURCE_DIR)/middleware/MTK/minicli/module.mk
# NVDM files
include $(SOURCE_DIR)/middleware/MTK/nvdm/module.mk
include $(SOURCE_DIR)/kernel/rtos/FreeRTOS/module.mk
include $(SOURCE_DIR)/kernel/service/module.mk

<%= APP_FILES %>

###################################################
# jerryscript
CFLAGS += -I$(SOURCE_DIR)/middleware/jerryscript/inc
CFLAGS += -DMTK_JR_ENABLE
# CFLAGS +=-mfloat-abi=softfp
CFLAGS += -I$(SOURCE_DIR)/middleware/jerryscript/inc/vm
CFLAGS += -I$(SOURCE_DIR)/middleware/jerryscript/inc/parser
CFLAGS += -I$(SOURCE_DIR)/middleware/jerryscript/inc/parser/regexp
CFLAGS += -I$(SOURCE_DIR)/middleware/jerryscript/inc/parser/js
CFLAGS += -I$(SOURCE_DIR)/middleware/jerryscript/inc/parser/js/bc
CFLAGS += -I$(SOURCE_DIR)/middleware/jerryscript/inc/parser/js/collections
CFLAGS += -I$(SOURCE_DIR)/middleware/jerryscript/inc/ecma
CFLAGS += -I$(SOURCE_DIR)/middleware/jerryscript/inc/ecma/operations
CFLAGS += -I$(SOURCE_DIR)/middleware/jerryscript/inc/ecma/base
CFLAGS += -I$(SOURCE_DIR)/middleware/jerryscript/inc/ecma/builtin-objects
CFLAGS += -I$(SOURCE_DIR)/middleware/jerryscript/inc/rcs
CFLAGS += -I$(SOURCE_DIR)/middleware/jerryscript/inc/jrt
CFLAGS += -I$(SOURCE_DIR)/middleware/jerryscript/inc/mem
CFLAGS += -I$(SOURCE_DIR)/middleware/jerryscript/inc/lit


ifeq ($(ml-mqtt),y)
CFLAGS += -I$(SOURCE_DIR)/middleware/third_party/mqtt/MQTTClient-C/src/mediatek
CFLAGS += -I$(SOURCE_DIR)/middleware/third_party/mqtt/MQTTClient-C/src
CFLAGS += -I$(SOURCE_DIR)/middleware/third_party/mqtt/MQTTPacket/src

include $(SOURCE_DIR)/middleware/third_party/mqtt/module.mk
endif

ifeq ($(ml-mcs),y)
CFLAGS += -I$(SOURCE_DIR)/middleware/third_party/mqtt/MQTTClient-C/src/mediatek
CFLAGS += -I$(SOURCE_DIR)/middleware/third_party/mqtt/MQTTClient-C/src
CFLAGS += -I$(SOURCE_DIR)/middleware/third_party/mqtt/MQTTPacket/src

include $(SOURCE_DIR)/middleware/third_party/mqtt/module.mk
endif

ifeq ($(MTK_JR_ENABLE),y)
# Jerryscript (Javascript Engine)
# LIBS += $(SOURCE_DIR)/middleware/jerryscript/lib/librelease-cp.jerry-core.a
LIBS += $(SOURCE_DIR)/middleware/jerryscript/targets/RTOS/libjerry/libjerrycore.a
LIBS += $(SOURCE_DIR)/middleware/jerryscript/targets/RTOS/libjerry/libjerrylibm.a
endif

##############################################################################
#
# Target Rules
#
##############################################################################


.PHONY: proj clean $(MODULE_PATH)

all: cleanlog proj
	$(Q)mkdir -p $(BUILD_DIR)
	$(Q)$(SIZE) $(OUTPATH)/$(PROJ_NAME).elf
	# $(Q)echo "Generate Assembly from elf:"
	# $(Q)$(OBJDUMP) -S $(OUTPATH)/$(PROJ_NAME).elf > $(OUTPATH)/$(PROJ_NAME).elf.s
	$(Q)$(SOURCE_DIR)/tools/scripts/build/copy_firmware.sh $(SOURCE_DIR) $(OUTPATH) $(IC_CONFIG) $(BOARD_CONFIG) $(PROJ_NAME).bin $(PWD)
	$(Q)cp *.cmm $(OUTPATH)/

MOD_EXTRA = BUILD_DIR=$(BUILD_DIR) OUTPATH=$(OUTPATH) PROJ_PATH=$(PROJ_PATH)

$(LIBS): $(MODULE_PATH)

$(MODULE_PATH):
	$(Q)+make -C $@ $(MOD_EXTRA) $($@_EXTRA)


proj: $(OUTPATH)/$(PROJ_NAME).elf

$(OUTPATH)/$(PROJ_NAME).elf: $(C_OBJS) $(CXX_OBJS) $(S_OBJS) $(LIBS)
	$(Q)echo Linking...
	$(Q)if [ -e "$@" ]; then rm -f "$@"; fi
	$(Q)if [ -e "$(OUTPATH)/$(PROJ_NAME).map" ]; then rm -f "$(OUTPATH)/$(PROJ_NAME).map"; fi
	$(Q)if [ -e "$(OUTPATH)/$(PROJ_NAME).hex" ]; then rm -f "$(OUTPATH)/$(PROJ_NAME).hex"; fi
	$(Q)if [ -e "$(OUTPATH)/$(PROJ_NAME).bin" ]; then rm -f "$(OUTPATH)/$(PROJ_NAME).bin"; fi
	$(Q)echo $(patsubst $(SDK_PATH)/%,$(SOURCE_DIR)/%, $(LDFLAGS) -Wl,--start-group $^ -Wl,--end-group -Wl,-Map=$(patsubst $(SDK_PATH)/%,$(SOURCE_DIR)/%,$(OUTPATH)/$(PROJ_NAME).map) -lm -o $@) > $(OUTPATH)/link_option.tmp
	$(Q)$(CXX) @$(OUTPATH)/link_option.tmp 2>>$(ERR_LOG)
	$(Q)rm -f $(OUTPATH)/link_option.tmp
	$(Q)$(OBJCOPY) -O ihex $(OUTPATH)/$(PROJ_NAME).elf $(OUTPATH)/$(PROJ_NAME).hex
	$(Q)$(OBJCOPY) -O binary $(OUTPATH)/$(PROJ_NAME).elf $(OUTPATH)/$(PROJ_NAME).bin
	$(Q)echo Done


include $(SOURCE_DIR)/.rule.mk

clean:
	$(Q)rm -rf $(OUTPATH)

.PHONY: options

options:
	@for opt in `sed 's/[()]/\n/g' $(SOURCE_DIR)/config/chip/$(IC_CONFIG)/chip.mk|sed 's/-D/ /'|sort|uniq|grep ^MTK_|grep _ENABLE$$`; do echo $$opt; done
print-%  : ; @echo $* = $($*)
