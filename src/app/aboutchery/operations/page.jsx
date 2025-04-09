"use client";

import ESGGovernance from "../../components/operations/ESGGovernance";
import OperationsParallax from "../../components/operations/OperationsParallax";
import SustainabilityAccordion from "../../components/operations/SustainabilityAccordion";

export default function Operations() {
  return (
    <main>
      <OperationsParallax />
      <ESGGovernance />
      <SustainabilityAccordion />
    </main>
  );
}
