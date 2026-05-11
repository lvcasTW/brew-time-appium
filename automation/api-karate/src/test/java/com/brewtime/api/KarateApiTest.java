package com.brewtime.api;

import com.intuit.karate.Results;
import com.intuit.karate.Runner;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class KarateApiTest {

    @Test
    void runFeatures() {
        Results results = Runner.path("classpath:features").parallel(1);
        assertEquals(0, results.getFailCount(), results.getErrorMessages());
    }
}
