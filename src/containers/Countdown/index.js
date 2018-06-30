import React from 'react'
import { connect } from 'react-redux'
import { withFormik } from 'formik'
import differenceInSeconds from 'date-fns/difference_in_seconds'
import { Input, Container, Label, Grid, Segment, Header, Button } from 'semantic-ui-react'
import { Counter } from './Styled'
import * as countdownActions from 'actions/countdown'

let intervalId

class CountDownTimer extends React.Component {

  handleClearClick = () => {
    clearInterval(this.intervalId)
    this.setState(this.initialState)
  }

  componentWillUnmount() {
    intervalId && clearInterval(intervalId)
  }

  test = () => {
    this.props.history.push('/')
  }

  render() {
    const { running, timeRemaining } = this.props
    const { handleBlur, handleChange, handleSubmit, touched, errors, values } = this.props
    return (
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
                { touched.startTime && errors.startTime && <Label basic color='red' pointing>
                  {errors.startTime}
                </Label> }
              </Grid.Column>
              <Grid.Column textAlign="center" style={{ marginTop: 10 }} tablet={5} mobile={14} computer={4} largeScreen={4}>
                <Header as='h1'>End Time</Header>
                <Input
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.endTime}
                  error={!!(touched.endTime && errors.endTime)}
                  fluid size="big" name="endTime" placeholder='hh:mm:ss' />
                { touched.endTime && errors.endTime && <Label basic color='red' pointing>
                  {errors.endTime}
                </Label> }
              </Grid.Column>
            </Grid.Row>
            <Grid.Row centered>
              <Grid.Column textAlign="center" tablet={10} mobile={14} computer={8} largeScreen={8}>
                <Segment padded='very'><Counter>{timeRemaining}s</Counter></Segment>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row centered>
              <Grid.Column textAlign="center" tablet={10} mobile={14} computer={8} largeScreen={8}>
                <Button fluid type="submit" color={running ? 'red' : 'green'} size='huge'>{ running ? 'Stop Countdown' : 'Start Countdown'}</Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </form>
      </Container>
    )
  }
}

function parseDate(dateStr) {
  const date = new Date()
  const [hours, minutes, seconds] = dateStr.split(':')
  date.setHours(hours)
  date.setMinutes(minutes)
  date.setSeconds(seconds)
  return date
}

function startCountdown(props, diff) {
  const { running, setRunning, setTimeRemaining } = props
  if (running) {
    setTimeRemaining(0)
    clearInterval(intervalId)
  } else {
    let timeRemaining = diff
    intervalId = setInterval(() => {
      timeRemaining = timeRemaining - 1

      if (timeRemaining === 0) {
        setRunning(false)
        clearInterval(intervalId)
      }

      if (timeRemaining >= 0) {
        setTimeRemaining(timeRemaining)
      }
    }, 1000)
  }
  setRunning(!running)
}

const enhancedWithFormik = withFormik({
  // Transform outer props into form values
  mapPropsToValues: props => ({ startTime: '', endTime: '' }),
  // Add a custom validation function (this can be async too!)
  validate: (values, props) => {
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
  },
  // Submission handler
  handleSubmit: (
    values,
    {
      props
    }
  ) => {
    const { setTimeRemaining } = props
    const { startTime, endTime } = values
    const startDateTime = parseDate(startTime)
    const endDateTime = parseDate(endTime)
    const diff = differenceInSeconds(endDateTime, startDateTime)
    startCountdown(props, diff)
    setTimeRemaining(diff)
  }
})(CountDownTimer)

const mapDispatchToProps = {
  setRunning: countdownActions.setRunning,
  setTimeRemaining: countdownActions.setTimeRemaining
}

const mapStateToProps = (state) => ({
  timeRemaining: state.countdown.timeRemaining,
  running: state.countdown.running
})

const enhancedWithRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(enhancedWithFormik)

export default enhancedWithRedux
