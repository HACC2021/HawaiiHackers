import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SubmitField, TextField, SelectField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import { Profiles } from '../../api/profile/Profile';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  first: String,
  last: String,
  role: {
    type: String,
    allowedValues: ['resident', 'visitor', 'local business/organization'],
    defaultValue: 'resident',
  },
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class AddProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { redirectToReferer: false };
  }

  // On submit, insert the data.
  submit(data) {
    const { first, last, role } = data;
    const owner = Meteor.user().username;
    Profiles.collection.insert({ first, last, role, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
          this.setState({ redirectToReferer: true });
        }
      });
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/home' } };
    if (this.state.redirectToReferer) {
      return <Redirect to={from}/>;
    }
    let fRef = null;
    return (
      <Grid container centered>
        <Grid.Column>
          <Header as="h2" textAlign="center">Add Profile</Header>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
            <Segment>
              <TextField name='first'/>
              <TextField name='last'/>
              <SelectField name='role'/>
              <SubmitField value='Submit'/>
              <ErrorsField/>
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

AddProfile.propTypes = {
  location: PropTypes.object,
};

export default AddProfile;
