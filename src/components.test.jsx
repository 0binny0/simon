
import {test, expect, vi} from "vitest";

import {render, screen} from "@testing-library/react";
import userEvent from '@testing-library/user-event'

import {Simon, Pad} from "./components.jsx";

const user = userEvent.setup();

test(
    `Verify that a pad receives a CSS color when the Simon game is turned on`
    , () => {
        render(<Pad isOn={true} color="blue"/>);
        const pad = screen.getByRole("button", {name: "blue_pad"});
        expect(pad).not.toHaveClass("power_blue_pad_off");
        expect(pad).toHaveClass("power_blue_pad_on");
    }
);