import { useState, useEffect } from "react";
import { ChallengeProps } from "../pages/Challenge";


const useChallenges = () => {
  const [challenges, setChallenges] = useState<ChallengeProps[]>([]);

  useEffect(() => {
    const storedChallenges = localStorage.getItem("challenges");
    if (storedChallenges) {
      setChallenges(JSON.parse(storedChallenges));
    }
  }, []);

  const addChallenge = (newChallenge: ChallengeProps) => {
    const updatedChallenges = [...challenges, newChallenge];
    setChallenges(updatedChallenges);
    localStorage.setItem("challenges", JSON.stringify(updatedChallenges));
  };

  const updateChallenge = (updatedChallenge: ChallengeProps) => {
    const updatedChallenges = challenges.map((challenge) =>
      challenge.id === updatedChallenge.id ? updatedChallenge : challenge
    );
    setChallenges(updatedChallenges);
    localStorage.setItem("challenges", JSON.stringify(updatedChallenges));
  };

  const removeChallenge = (id: number) => {
    const updatedChallenges = challenges.filter((challenge) => challenge.id !== id);
    setChallenges(updatedChallenges);
    localStorage.setItem("challenges", JSON.stringify(updatedChallenges));
  };

  return { challenges, addChallenge, updateChallenge, removeChallenge };
};

export default useChallenges;
