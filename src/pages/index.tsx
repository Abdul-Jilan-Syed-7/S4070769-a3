import React, { useState} from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { DEFAULT_Breed } from "../types/breed";
import { useRouter } from "next/router";
import { usePremium } from "@/context/PremiumContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});


export default function Home() {
  const [breed, setbreed] = useState("");
  const [Age, setage] = useState("");
  const [precond, setprecond] = useState("");
  const [coveravage, setcoverage] = useState("");
  const [error, setError] = useState("");
  const [totalPremiums, setTotalPremiums] = useState<number | null>(null);
  const [breakdown, setBreakdown] = useState<Record<string, any> | null>(null);
  const router = useRouter();
  const { totalPremium } = usePremium();
  const { setTotalPremium } = usePremium();
  
  const handleSubmit = async () => {
    const validCoverages = ["basic", "standard", "premium"];
    const ageNumber = Number(Age);
    const validBreeds = DEFAULT_Breed.map(b => b.breed.toLowerCase());
    const conditionValue = precond.trim().toLowerCase();

    if (!breed.trim()) {
      setError("Please enter the pet's breed.");
    } else if (!validBreeds.includes(breed.trim().toLowerCase())) {
      setError("Breed must be one of the predefined dog breeds.");
    } else if (!ageNumber || ageNumber <= 0) {
      setError("Please enter a valid age greater than 0.");
    } else if (conditionValue !== "true" && conditionValue !== "false") {
      setError("Pre-existing condition must be selected as true or false.");
    }  else if (!validCoverages.includes(coveravage.trim().toLowerCase())) {
      setError("Coverage level must be: basic, standard, or premium.");
    } else {
       const requestBody = {
        breed: breed.trim(),
        age: ageNumber,
        hasPreExistingConditions: conditionValue === "true",
        coverageLevel: coveravage.trim().toLowerCase(),
      };

      try {
        const response = await fetch("https://pet-insurance.matthayward.workers.dev/calculate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch premium details.");
        }

        const result = await response.json();
        setTotalPremium(result.totalPremium); 
        setTotalPremiums(result.totalPremium);
        setBreakdown(result.breakdown);
        router.push({
          pathname: "/result",
          query: {
            base: result.breakdown.basePremium,
            ageAdj: result.breakdown.ageAdjustment,
            preAdj: result.breakdown.preExistingConditionAdjustment,
            covAdj: result.breakdown.coverageLevelAdjustment,
          },
        });
      } catch (err) {
        setError("Something went wrong while fetching the premium. Please try again.");
        console.error(err);
      }
    }
  };

  return (
    <div className={`layout ${geistSans.variable} font-sans`}>
      <header className="header">
        XYZ Pet Insurance
        {totalPremium !== null && (
          <span style={{ float: "right", fontWeight: "normal", fontSize: "0.9rem" }}>
            Total Premium: ${totalPremium}
          </span>
        )}
      </header>
      <p className="title">Pet Insurance Calculator</p>

      <main className="main">
        <div className="left">
          <div className="form-group">
            <label>Breed</label>
            <input
              type="text"
              placeholder="e.g. Bulldog"
              value={breed}
              onChange={(e) => setbreed(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Age</label>
            <input
              type="number"
              placeholder="e.g. 3"
              value={Age}
              onChange={(e) => setage(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="right">
          <div className="form-group">
            <label>Pre-existing Condition</label>
            <input
              type="text"
              placeholder="True or False"
              value={precond}
              onChange={(e) => setprecond(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Coverage Level</label>
            <input
              type="text"
              placeholder="Basic, Standard, Premium"
              value={coveravage}
              onChange={(e) => setcoverage(e.target.value)}
              required
            />
          </div>
        </div>
      </main>
      {error && <p className="error-message">{error}</p>}
      <div className="button-wrapper">
        <button className="calculate-button" onClick={handleSubmit}>
          Calculate
        </button>
      </div>

      <footer className="footer">
        &copy; 2025 My Website. All rights reserved.
      </footer>
    </div>
  );
}
