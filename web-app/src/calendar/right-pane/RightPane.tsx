import { Button } from 'components/Button';
import { Field, FieldType } from 'components/Field';
import * as React from 'react';
import './RightPane.css';

const RightPane = () => {
  return (
    <aside className="app__right-pane grid-col-2">
      <div className="grid-col-span-2 app__right-pane__controls">
        <Button className="btn--secondary">Delete</Button>
      </div>
      <h2 className="grid-col-span-2">Client</h2>
      <Field title="First Name" type={FieldType.Text} />
      <Field title="Last Name" type={FieldType.Text} />
      <Field title="Email" type={FieldType.Text} />
      <Field title="Telephone" type={FieldType.Text} />
      <h2 className="grid-col-span-2">Appointment</h2>
      <Field title="Date" type={FieldType.Text} />
      <Field title="Time" type={FieldType.Text} />
      <Field title="Services" type={FieldType.Text} />
    </aside>
  );
};

export default RightPane;
