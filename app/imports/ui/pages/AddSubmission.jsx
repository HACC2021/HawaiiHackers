import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, DateField, SubmitField, LongTextField, BoolField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Submissions } from '../../api/submission/Submission';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  date: {
    type: Date,
    defaultValue: new Date(),
  },
  description: String,
  picture: {
    type: String,
    optional: true,
  },
  publication: {
    type: Boolean,
    defaultValue: true,
  },
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class AddSubmission extends React.Component {

  // On submit, insert the data.
  submit(data, formRef) {
    const { date, description, picture, publication } = data;
    const owner = Meteor.user().username;
    Submissions.collection.insert({ date, description, picture, publication, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Submission added successfully. Please wait for admin approval.', 'success');
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
          <Header as="h2" textAlign="center">Add Submission</Header>
          <Header as="h3">Tell us how you help protect Hawaii’s unique and limited natural, cultural and historic resources</Header>
          Earn 30 Pono Points for every approved submission
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
            <Segment>
              <DateField name='date'/>
              <LongTextField name='description'/>
              <TextField name='picture' placeholder='URL to picture'/>
              <BoolField name='publication' appearance="checkbox" label='Share with other users'/>
              <SubmitField value='Submit'/>
              <ErrorsField/>
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

export default AddSubmission;
