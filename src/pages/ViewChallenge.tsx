import { useParams } from "react-router-dom";
import useChallenges from "../hooks/useChallenge";

const ChallengeDetails = () => {
  const { id } = useParams<{ id: string }>(); // Get the challenge ID from the URL
  const { challenges } = useChallenges(); // Get the list of challenges
  const challenge = challenges.find((c) => c.id === Number(id)); // Find the challenge by ID

  if (!challenge) {
    return <h2>Challenge not found</h2>;
  }

  return (
    <div>
      <h2>{challenge.title}</h2>
      <p>{challenge.description}</p>
      <p>Frequency: {challenge.frequency}</p>
      <p>Duration: {challenge.duration} {challenge.frequency === "Daily" ? "days" : "weeks"}</p>
      <p>Status: {challenge.status}</p>
    </div>
  );
};

export default ChallengeDetails;
