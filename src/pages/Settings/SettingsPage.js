import * as React from "react";
import { Form, Checkbox, Button } from "semantic-ui-react";
import UserSettings from "../../components/UserSettings/UserSettings";

const Settings = () => (
  <Form>
    <UserSettings />    
    <Form.Field>
      <label>Language</label>
      EN <Checkbox toggle /> DE
    </Form.Field>
    <Button type="button">Reset</Button>
  </Form>
);

export default Settings;
