
import {test, expect, vi, beforeEach, afterEach} from "vitest";

import {render, screen, waitFor} from "@testing-library/react";
import userEvent from '@testing-library/user-event'

import {Simon, Pad} from "./components.jsx";


beforeEach(() => {
    vi.useFakeTimers();
});

afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
});

test(
    `Verify that a pad receives a CSS color when the Simon game is turned on`
    , () => {
        render(<Pad isOn={true} color="blue"/>);
        const pad = screen.getByRole("button", {name: "blue_pad"});
        expect(pad).not.toHaveClass("power_blue_pad_off");
        expect(pad).toHaveClass("power_blue_pad_on");
    }
);


test(
    `
    Verify that clicking the start button (when the game is on) displays on the
    screen the beginning level (Level 1)

    See:

    * https://github.com/testing-library/react-testing-library/issues/1198
    * https://github.com/testing-library/user-event/issues/1115
    `, async () => {
        let user = userEvent.setup({advanceTimers: () => vi.advanceTimersToNextTimer});
        render(<Simon />);
        await user.click(screen.getByRole("button", {name: "turn_game_on"}));
        await user.click(screen.getByRole("button", {name: "start_new_game"}));
        expect(await screen.findByText("--")).toBeVisible();
        expect(await screen.findByText("1")).toBeVisible();
    }
);