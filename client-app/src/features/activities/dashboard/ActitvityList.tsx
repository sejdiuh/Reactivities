import React from "react";
import { Item, Button, Label, Segment } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";

interface IProps {
  activities: IActivity[];
  selectActivity: (id: string) => void;
  deleteActivity: (e: any, id: string) => void;
  submiting: boolean;
  target: string
}

export const ActitvityList: React.FC<IProps> = ({
  activities,
  selectActivity,
  deleteActivity,
  submiting,
  target
}) => {
  return (
    <Segment>
      <Item.Group divided>
        {activities.map(activity => (
          <Item key={activity.id}>
            <Item.Content>
              <Item.Header as="a">{activity.title}</Item.Header>
              <Item.Meta>{activity.date}</Item.Meta>
              <Item.Description>
                <div>{activity.description}</div>
                <div>
                  {activity.city}, {activity.venue}
                </div>
              </Item.Description>
              <Item.Extra>
                <Button
                  onClick={() => selectActivity(activity.id)}
                  floated="right"
                  content="view"
                  color="blue"
                ></Button>
                <Button
                  loading={target == activity.id && submiting}
                  name={activity.id}
                  onClick={e => deleteActivity(e, activity.id)}
                  floated="right"
                  content="delete"
                  color="red"
                ></Button>
                <Label basic content={activity.category}></Label>
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
};
