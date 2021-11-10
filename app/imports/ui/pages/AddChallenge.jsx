import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, NumField, DateField, LongTextField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Challenges } from '../../api/challenge/Challenge';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  date: {
    type: Date,
    defaultValue: new Date(),
  },
  title: String,
  picture: {
    type: String,
    optional: true,
  },
  points: Number,
  purpose: String,
  instructions: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class AddChallenge extends React.Component {

  // On submit, insert the data.
  submit(data, formRef) {
    const { date, title, picture, points, purpose, instructions } = data;
    const owner = Meteor.user().username;
    Challenges.collection.insert({ date, title, picture, points, purpose, instructions, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Challenge added successfully', 'success');
          formRef.reset();
        }
      });
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  render() {
    let fRef = null;
    return (
      <Grid container centered>
        <Grid.Column>
          <Header as="h2" textAlign="center">Add Challenge</Header>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
            <Segment>
              <DateField name='date'/>
              <TextField name='title'/>
              <LongTextField name='purpose'/>
              <LongTextField name='instructions'/>
              <NumField name='points' decimal={false} min={0}/>
              <TextField name='picture' placeholder='URL to picture'/>
              <SubmitField value='Submit'/>
              <ErrorsField/>
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

export default AddChallenge;
