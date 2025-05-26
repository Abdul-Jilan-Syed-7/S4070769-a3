// __tests__/index.test.tsx

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Home from "@/pages/index";
import { PremiumProvider } from "@/context/PremiumContext";

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({
      totalPremium: 75,
      breakdown: {
        basePremium: 50,
        ageAdjustment: 10,
        preExistingConditionAdjustment: 5,
        coverageLevelAdjustment: 10,
      }
    }),
  })
) as jest.Mock;

describe("Premium Calculator", () => {
  it("should call the API and set totalPremium in context", async () => {
    render(
      <PremiumProvider>
        <Home />
      </PremiumProvider>
    );

    // Now fill and submit the form
    fireEvent.change(screen.getByLabelText(/Breed/i), {
      target: { value: "Labrador Retriever" }
    });
    fireEvent.change(screen.getByPlaceholderText(/e\.g\. 3/i), {
      target: { value: "3" }
    });
    fireEvent.change(screen.getByLabelText(/Pre-existing Condition/i), {
      target: { value: "false" }
    });
    fireEvent.change(screen.getByLabelText(/Coverage Level/i), {
      target: { value: "standard" }
    });

    fireEvent.click(screen.getByText(/Calculate/i));

    await waitFor(() =>
      expect(global.fetch).toHaveBeenCalledTimes(1)
    );
  });
});
