import { Accordion, ActionIcon, Button, Fieldset, Input, createTheme } from "@mantine/core";

import accrodionClasses from "./accordion.module.css";
import buttonClasses from "./button.module.css";
import fieldsetClasses from "./fieldset.module.css";
import inputClasses from "./input.module.css";

export const theme = createTheme({
    components: {
        Input: Input.extend({ classNames: inputClasses }),
        InputWrapper: Input.Wrapper.extend({ classNames: inputClasses }),
        Button: Button.extend({ classNames: buttonClasses }),
        ActionIcon: ActionIcon.extend({ classNames: buttonClasses }),
        Accordion: Accordion.extend({ classNames: accrodionClasses }),
        Fieldset: Fieldset.extend({ classNames: fieldsetClasses }),
    },
});
