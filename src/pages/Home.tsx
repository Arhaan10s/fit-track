import { useState } from "react";
import useChallenges from "../hooks/useChallenge";
import { ChallengeProps } from "./Challenge";

const Home = () => {
  const { challenges, removeChallenge, updateChallenge } = useChallenges(); // hooks for displaying ,updating,removing challenges
  const [editingChallenge, setEditingChallenge] = useState<number | null>(null); //state for editing challenge 
  const [editFormValues, setEditFormValues] = useState<Partial<ChallengeProps>>({}); //state for editing existing form values
  const [filterStatus, setFilterStatus] = useState<'All' | 'Active' | 'Missed'>('All');// state to filter the challenges based on the status

  const handleEdit = (id: number) => {
    const challengeToEdit = challenges.find((challenge) => challenge.id === id);
    if (challengeToEdit) {
      setEditingChallenge(id);
      setEditFormValues({...challengeToEdit,status: challengeToEdit.status});
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditFormValues({ ...editFormValues, [name]: value });
  };

  const handleSaveEdit = (editFormValues: Partial<ChallengeProps>) => {
    if(!editFormValues.title || !editFormValues.description ) {
    
      alert("Please enter the fields"); // checking if the fields are not left empty
      return;
    }
    if (editingChallenge !== null) {
      const updatedChallenge = { ...editFormValues, id: editingChallenge } as ChallengeProps;
      updateChallenge(updatedChallenge);
      setEditingChallenge(null); // Reset the editing state
    }
  };

  const handleCancelEdit = () => {
    setEditingChallenge(null);  //no new challenge to be edited so change it to null for current challenge
    setEditFormValues({}); //set the form values for editing challenge fields to empty object 
  };

  const filteredChallenges = challenges.filter((challenge) => 
    filterStatus === 'All' ? true : challenge.status === filterStatus
  ).sort((a) => (a.status === "Active" ? -1 : 1));; // sorting to make active challenge come first

  return (
    <div id="challenge">
      <h3 id="home-h3">Challenge Details</h3>

      <label htmlFor="statusFilter">Filter by Status:</label>
      <select 
        id="statusFilter" 
        value={filterStatus} 
        onChange={(e) => setFilterStatus(e.target.value as 'All' | 'Active' | 'Missed')}
      >
        <option value="All">All</option>
        <option value="Active">Active</option>
        <option value="Missed">Missed</option>
      </select>

      {filteredChallenges && filteredChallenges.length > 0 ? ( //displaying with respect to status 
        <table id="challenge-t" >
          <thead >
            <tr id="challenge">
              <th>Challenge</th>
              <th>Description</th>
              <th>Frequency</th>
              <th>Duration</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredChallenges.map((challenge: ChallengeProps) => (
              <tr key={challenge.id} >
                {editingChallenge === challenge.id ? ( //checking if perticular challenge is available for edit or not
                  <>
                    <td >
                      <input 
                        name="title"
                        value={editFormValues.title || ""} //editng the title if present otherwise blank space
                        onChange={handleInputChange} // handing user inpur at the time of input field change
                        placeholder="Title"
                      />
                    </td>
                    <td>
                      <input
                        name="description"
                        value={editFormValues.description || ""}
                        onChange={handleInputChange}
                        placeholder="Description"
                      />
                    </td>
                    <td id="table-td">{challenge.frequency}</td>
                    <td id="table-td">{challenge.duration} {challenge.frequency === "Daily" ? "days" : "weeks"}</td>
                    <td>
                      <select 
                        name="status"
                        value={editFormValues.status || challenge.status}
                        onChange={handleInputChange}
                      >
                        <option ></option>
                        <option value="Active">Active</option>
                        <option value="Missed">Missed</option>
                      </select>
                    </td>
                    <td className="container">
                      <button onClick={()=>handleSaveEdit(editFormValues)}>Save</button>
                      <button onClick={handleCancelEdit}>Cancel</button>
                    </td>
                  </>
                ) : ( // else display all the fields
                  <>
                    <td id="table-td">{challenge.title}</td>
                    <td id="table-td">{challenge.description}</td>
                    <td id="table-td">{challenge.frequency}</td>
                    <td id="table-td">{challenge.duration} {challenge.frequency === "Daily" ? "days" : "weeks"}</td>
                    <td id="table-td">{challenge.status}</td>
                    <td className="container">
                      <button onClick={() => handleEdit(challenge.id)}>Edit</button>
                      <button onClick={() => removeChallenge(challenge.id)}>End</button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h2 id="home-h2">No Challenges yet.</h2>
      )}
    </div>
  );
};

export default Home;
