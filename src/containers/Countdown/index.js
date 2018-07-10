import React from 'react'
import { connect } from 'react-redux'
import { Formik } from 'formik'
import differenceInSeconds from 'date-fns/difference_in_seconds'
import { Input, Container, Label, Grid, Segment, Header, Button } from 'semantic-ui-react'
import { Counter } from './Styled'
import * as countdownActions from 'actions/countdown'

function parseDate(dateStr) {
  const date = new Date()
  const [hours, minutes, seconds] = dateStr.split(':')
  date.setHours(hours)
  date.setMinutes(minutes)
  date.setSeconds(seconds)
  return date
}

class CountDownTimer extends React.Component {
  componentWillUnmount() {
    this.stop()
  }

  stop() {
    clearInterval(this.interval)
  }

  start(diff) {
    const { running, setRunning, setTimeLeft } = this.props
    if (running) {
      setTimeLeft(0)
      this.stop()
    } else {
      let timeLeft = diff
      this.interval = setInterval(() => {
        timeLeft = timeLeft - 1

        if (timeLeft === 0) {
          setRunning(false)
          this.stop()
        }

        if (timeLeft >= 0) {
          setTimeLeft(timeLeft)
        }
      }, 1000)
    }
    setRunning(!running)
  }

  render() {
    const { running, timeLeft } = this.props
    return (
      <Formik
        initialValues={{ startTime: '', endTime: '' }}
        validate={values => {
          const errors = {}
          const timePattern = /^([0-1][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/
          const { startTime, endTime } = values
          const startDateTime = parseDate(startTime)
          const endDateTime = parseDate(endTime)
          const diff = differenceInSeconds(endDateTime, startDateTime)

          if (!startTime) {
            errors.startTime = 'Start Time should not be empty'
          } else if (!timePattern.test(startTime)) {
            errors.startTime = 'Invalid date: date should be in HH:MM:SS format!'
          }

          if (!endTime) {
            errors.endTime = 'End Time should not be empty'
          } else if (!timePattern.test(endTime)) {
            errors.endTime = 'Invalid date: date should be in HH:MM:SS format!'
          } else if (diff < 0) {
            errors.endTime = 'End Time should represent a time later than the Start Time.'
          }

          return errors
        }}
        onSubmit={(
          values
        ) => {
          const { setTimeLeft } = this.props
          const { startTime, endTime } = values
          const startDateTime = parseDate(startTime)
          const endDateTime = parseDate(endTime)
          const diff = differenceInSeconds(endDateTime, startDateTime)
          setTimeLeft(diff)
          this.start(diff)
        }}
        render={({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit
        }) => (
            <Container fluid style={{ paddingTop: '6%' }}>
              <form onSubmit={handleSubmit}>
                <Grid>
                  <Grid.Row centered>
                    <Grid.Column textAlign="center" style={{ marginTop: 10 }} tablet={5} mobile={14} computer={4} largeScreen={4}>
                      <Header as='h1'>Start Time</Header>
                      <Input
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.startTime}
                        error={!!(touched.startTime && errors.startTime)}
                        fluid size="big" name="startTime" placeholder='hh:mm:ss' />
                      {touched.startTime && errors.startTime && <Label basic color='red' pointing>
                        {errors.startTime}
                      </Label>}
                    </Grid.Column>
                    <Grid.Column textAlign="center" style={{ marginTop: 10 }} tablet={5} mobile={14} computer={4} largeScreen={4}>
                      <Header as='h1'>End Time</Header>
                      <Input
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.endTime}
                        error={!!(touched.endTime && errors.endTime)}
                        fluid size="big" name="endTime" placeholder='hh:mm:ss' />
                      {touched.endTime && errors.endTime && <Label basic color='red' pointing>
                        {errors.endTime}
                      </Label>}
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row centered>
                    <Grid.Column textAlign="center" tablet={10} mobile={14} computer={8} largeScreen={8}>
                      <Segment padded='very'><Counter>{timeLeft}s</Counter></Segment>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row centered>
                    <Grid.Column textAlign="center" tablet={10} mobile={14} computer={8} largeScreen={8}>
                      <Button fluid type="submit" color={running ? 'red' : 'green'} size='huge'>{running ? 'Stop Countdown' : 'Start Countdown'}</Button>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </form>
            </Container>
          )}
      />
    )
  }
}

const mapDispatchToProps = {
  setRunning: countdownActions.setRunning,
  setTimeLeft: countdownActions.setTimeLeft
}

const mapStateToProps = (state) => ({
  timeLeft: state.countdown.timeLeft,
  running: state.countdown.running
})

const enhancedWithRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(CountDownTimer)

export default enhancedWithRedux
