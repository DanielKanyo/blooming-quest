import { Accordion, ActionIcon, Button, Input, Tabs, createTheme } from "@mantine/core";

import accrodionClasses from "./accordion.module.css";
import buttonClasses from "./button.module.css";
import inputClasses from "./input.module.css";
import tabsClasses from "./tabs.module.css";

export const theme = createTheme({
    components: {
        Input: Input.extend({ classNames: inputClasses }),
        InputWrapper: Input.Wrapper.extend({ classNames: inputClasses }),
        Button: Button.extend({ classNames: buttonClasses }),
        ActionIcon: ActionIcon.extend({ classNames: buttonClasses }),
        Accordion: Accordion.extend({ classNames: accrodionClasses }),
        Tabs: Tabs.extend({ classNames: tabsClasses }),
    },
});
