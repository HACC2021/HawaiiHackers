import React from 'react';
import { Button, Card, Grid, Icon } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
      <Grid id='landing' textAlign='center'>
        <Grid.Column width={5}>
          <Card.Group itemsPerRow={1}>
            <Card>
              <Card.Content>
                <Card.Header>
                  <Icon name='leaf' color='green'/>PonoPoints
                </Card.Header>
                <Card.Description>
                  To help educate visitors and new residents about Hawaii&apos;s local culture and very special
                  environment, we are asking visitors, residents, local businesses and organizations to share how their
                  interactions and choices impact Hawaii&apos;s unique and limited natural, cultural and historic
                  resources.
                  <br/><br/><Button href='#/home' color="blue">Continue</Button>
                </Card.Description>
              </Card.Content>
            </Card>
          </Card.Group>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Landing;
