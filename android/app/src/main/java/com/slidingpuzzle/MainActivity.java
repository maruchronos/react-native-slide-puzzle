package com.slidingpuzzle;
import android.os.Bundle;
import com.reactnativecomponent.splashscreen.RCTSplashScreen;

import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {
 @Override
	protected void onCreate(Bundle savedInstanceState) {
		RCTSplashScreen.openSplashScreen(this);   //open splashscreen
		super.onCreate(savedInstanceState);
	}

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "SlidingPuzzle";
    }
}
