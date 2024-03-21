import { Gesture, GestureDetector } from 'react-native-gesture-handler'

import { useCallback, useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { runOnJS } from 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'

import Colors from 'src/components/Colors'
import question1 from 'src/components/questions/1'
import question2 from 'src/components/questions/2'
import question3 from 'src/components/questions/3'
import { Text, View } from 'src/components/Themed'
import { type RootStackScreenProps } from 'src/navigation/types'
import { useAppDispatch, useAppSelector } from 'src/store'
import { addEntry, type Level, resetLevel } from 'src/store/slices/game'

interface Question {
  question: string
  id: string
}
function getQuestion (level: Level, skipIds: string[], resetCallback: () => void): Question {
  const questions = level === 1 ? question1 : level === 2 ? question2 : question3
  const normalizedQuestions = questions.split('\n').filter(v => v).map((value, index) => ({
    question: value,
    id: `${level}-${index}`
  }))
  const item = normalizedQuestions[Math.floor(Math.random() * normalizedQuestions.length)]
  if (skipIds.includes(item.id)) {
    // check if skipIds are full
    const thisLevelIds = skipIds.filter(v => v.split('-')[0] === String(level))

    if (skipIds.length === thisLevelIds.length) {
      // no more new questions, reset?
      resetCallback()
      return getQuestion(level, skipIds, resetCallback)
    }
    return getQuestion(level, skipIds, resetCallback)
  }
  return item
}

export default ({
  navigation,
  route
}: RootStackScreenProps<'Game'>): JSX.Element => {
  const [question, setQuestion] = useState<Question>()
  const skipIds = useAppSelector(store => store.game.viewedQuestionIds)
  const dispatch = useAppDispatch()

  const resetCallback = useCallback(() => {
    dispatch(resetLevel(route.params.level))
  }, [dispatch])

  const saveQuestion = useCallback((id?: string) => {
    if (id != null) {
      dispatch(addEntry(id))
    }
  }, [dispatch])

  const getNewQuestion = useCallback(() => {
    return getQuestion(route.params.level, skipIds, resetCallback)
  }, [route.params.level, skipIds, resetCallback])

  useEffect(() => {
    const item = getNewQuestion()
    setQuestion(item)
  }, [getNewQuestion, setQuestion])

  const doubleTap = Gesture.Tap()
    .maxDuration(250)
    .numberOfTaps(2)
    .onStart(() => {
      runOnJS(saveQuestion)(question?.id)
      runOnJS(getNewQuestion)
    })
  return (
    <GestureDetector gesture={doubleTap}>
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.question}>{question?.question}</Text>
        </View>
        <Text style={styles.hint} darkColor={Colors.dark.placeholder} lightColor={Colors.light.placeholder}>Double tap for next question</Text>
      </SafeAreaView>
    </GestureDetector>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  content: {
    marginTop: -100,
    paddingHorizontal: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  question: {
    textAlign: 'center',
    fontSize: 30
  },
  hint: {
    fontSize: 14
  }
})
