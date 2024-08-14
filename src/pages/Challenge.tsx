import { useState } from "react";
import useChallenges from "../hooks/useChallenge"
import { type FormEvent } from "react";


export type ChallengeProps = { // creating props for challenge fields
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  frequency: string;
  duration: number;
  status: string;
};


const CreateChallenge = () => {
  const { addChallenge } = useChallenges(); // using hooks for adding a challenge

  const [freq, setFreq] = useState("Daily");  // managing state of freq and setting it to daily by default
  const [duration, setDuration] = useState(1); // duration managing state

  const initialFormValues: ChallengeProps = { // intializing the initial values for the challenge
    id: Math.random(),
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    frequency: "Daily",
    duration: 1,
    status:"",
  };

  const [formValues, setFormValues] = useState<ChallengeProps>(initialFormValues);//managing state of form values that user will input

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => { // handling form fields change and storing it in state
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,  // storing values with respect to name in that perticular index of array
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      !formValues.title ||        //checking if the fields are not left empty
      !formValues.description ||
      !formValues.startDate ||
      !formValues.endDate
    ) {
      alert("Please fill in all fields before submitting.");
      return;
    }

    const newChallenge: ChallengeProps = {
      ...formValues,        // ... will load all the form values
      id: Date.now(),       //creating new challenges
      frequency: freq,
      duration: duration,
    };

    addChallenge(newChallenge);
    alert("Challenge submitted");

    setFormValues(initialFormValues);
  };

  return (
    <div id="challenge">
      <h3>Create Your Challenge</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            name="title"
            value={formValues.title}
            onChange={handleChange}
            placeholder="Title"
          />
        </div>

        <div className="form-row">
          <label htmlFor="description">Description</label>
          <input
            id="description"
            type="text"
            name="description"
            value={formValues.description}
            onChange={handleChange}
            placeholder="Description"
          />
        </div>

        <div className="form-row">
          <label htmlFor="startDate">Start Date</label>
          <input
            id="startDate"
            type="date"
            name="startDate"
            value={formValues.startDate}
            onChange={handleChange}
            placeholder="Start Date"
          />
        </div>

        <div className="form-row">
          <label htmlFor="endDate">End Date</label>
          <input
            id="endDate"
            type="date"
            name="endDate"
            value={formValues.endDate}
            onChange={handleChange}
            placeholder="End Date"
          />
        </div>

        <div className="form-row">
          <label htmlFor="freq">Frequency</label>
          <select
            name="freq"
            id="freq"
            value={freq}
            onChange={(e) => setFreq(e.target.value)}
          >
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
          </select>
        </div>

        <div className="form-row">
          <label htmlFor="duration"> Duration </label>
          <input
            id="duration"
            type="number"
            min={1}
            style={{ maxWidth: "5rem" }}
            name="duration"
            value={duration}
            onChange={(e) => setDuration(+e.target.value)}
            placeholder="End Date"
          />
          <h3>{freq === "Daily" ? "Days" : "Weeks"}</h3>
        </div>

        <button id="button" type="submit">
          CREATE
        </button>
      </form>
    </div>
  );
};

export default CreateChallenge;
