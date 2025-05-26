import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { usePremium } from "../context/PremiumContext";

export default function Result() {
  const router = useRouter();
  const { totalPremium } = usePremium();
  const { base, ageAdj, preAdj, covAdj } = router.query;

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (router.isReady) {
      setLoaded(true);
    }
  }, [router.isReady]);

  const handleBack = () => {
    router.push("/");
  };

  return (
    <div className="layout">
      <header className="header">
  XYZ Pet Insurance
  {totalPremium !== null && (
    <span style={{ float: "right", fontWeight: "normal", fontSize: "0.9rem" }}>
      Total Premium: ${totalPremium}
    </span>
  )}
</header>

      <main className="result-main">
        <h2>Thank You!</h2>
        <p>Here is your premium breakdown:</p>

        {loaded ? (
          <div className="premium-table">
            <div><strong>Total Premium:</strong> ${totalPremium}</div>
            <div><strong>Base Premium:</strong> ${base}</div>
            <div><strong>Age Adjustment:</strong> ${ageAdj}</div>
            <div><strong>Pre-existing Condition Adjustment:</strong> ${preAdj}</div>
            <div><strong>Coverage Level Adjustment:</strong> ${covAdj}</div>
          </div>
        ) : (
          <p>Loading...</p>
        )}

        <p className="thank-you">We appreciate your interest in our insurance plans!</p>

        <div className="back-wrapper">
          <button className="back-button" onClick={handleBack}>← Back</button>
        </div>
      </main>

      <footer className="footer">
        &copy; 2025 My Website. All rights reserved.
      </footer>
    </div>
  );
}
