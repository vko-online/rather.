import { useEffect, useState } from 'react'

import { Ionicons } from '@expo/vector-icons'
import * as Font from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'

export default function useCachedResources (): boolean {
  const [isLoadingComplete, setLoadingComplete] = useState(false)

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync (): Promise<void> {
      try {
        void SplashScreen.preventAutoHideAsync()

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font
        })
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e)
      } finally {
        setLoadingComplete(true)
        void SplashScreen.hideAsync()
      }
    }

    void loadResourcesAndDataAsync()
  }, [])

  return isLoadingComplete
}
