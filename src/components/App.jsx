import React, { Component } from 'react';
import { Container } from './App.styled';
import Section from 'components/Section';
import FeedbackOptions from 'components/FeedbackOptions';
import Statistics from 'components/Statistics';
import Notification from 'components/Notification';

export class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  handleLeftFeedback = option => {
    this.setState(prevState => ({
      [option]: prevState[option] + 1,
    }));
  };

  countTotalFeedback = () => {
    const { good, neutral, bad } = this.state;
    return good + neutral + bad;
  };

  positivePercentage = () => {
    return Math.round(
      (100 / this.countTotalFeedback()) * (this.state.good + this.state.neutral)
    );
  };

  render() {
    const optionKeys = Object.keys(this.state);
    const optionValues = Object.values(this.state);
    return (
      <Container>
        <Section title="Please leave feedback">
          <FeedbackOptions
            options={optionKeys}
            onLeaveFeedback={this.handleLeftFeedback}
          />
        </Section>
        <Section title="Statistics">
          {optionValues.some(optionValue => optionValue > 0) ? (
            <Statistics
              good={this.state.good}
              neutral={this.state.neutral}
              bad={this.state.bad}
              total={this.countTotalFeedback()}
              positivePercentage={this.positivePercentage()}
            />
          ) : (
            <Notification message="No feedback given" />
          )}
        </Section>
      </Container>
    );
  }
}
