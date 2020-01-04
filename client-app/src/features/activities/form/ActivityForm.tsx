import React, { useState } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";
import {v4 as uuid} from 'uuid';

interface IProps {
  setEditMode: (editMode: boolean) => void;
  activity: IActivity;
  handleAddActivity: (activity: IActivity) => void;
  handleEditActivity: (activity: IActivity) => void;
  submiting: boolean;
}

export const ActivityForm: React.FC<IProps> = ({
  setEditMode,
  activity: initialFormState,
  handleEditActivity,
  handleAddActivity,
  submiting
}) => {
  const initializeForm = () => {
    if (initialFormState) return initialFormState;
    else {
      return {
        id: "",
        title: "",
        description: "",
        category: "",
        date: "",
        city: "",
        venue: ""
      };
    }
  };

  const [activity, setActivity] = useState<IActivity>(initializeForm);

  const handleSubmit = () => {
    if(activity.id.length === 0)
    {
        let newActivity = {...activity, id: uuid()};
        handleAddActivity(newActivity);
    }
    else{
        handleEditActivity(activity);
    }
  };

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setActivity({ ...activity, [name]: value });
  };

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          placeholder="Title"
          name="title"
          onChange={handleInputChange}
          value={activity.title}
        ></Form.Input>
        <Form.TextArea
          rows={2}
          name="description"
          onChange={handleInputChange}
          placeholder="Description"
          value={activity.description}
        ></Form.TextArea>
        <Form.Input
          name="category"
          onChange={handleInputChange}
          placeholder="Category"
          value={activity.category}
        ></Form.Input>
        <Form.Input
          type="datetime-local"
          name="date"
          onChange={handleInputChange}
          placeholder="Date"
          value={activity.date}
        ></Form.Input>
        <Form.Input
          placeholder="City"
          name="city"
          onChange={handleInputChange}
          value={activity.city}
        ></Form.Input>
        <Form.Input
          placeholder="Venue"
          name="venue"
          onChange={handleInputChange}
          value={activity.venue}
        ></Form.Input>
        <Button loading={submiting}
          floated="right"
          positive
          type="submit"
          content="Submit"
        ></Button>
        <Button
          onClick={() => setEditMode(false)}
          floated="right"
          type="submit"
          content="Cancel"
        ></Button>
      </Form>
    </Segment>
  );
};
