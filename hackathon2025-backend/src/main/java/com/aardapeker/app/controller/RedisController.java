package com.aardapeker.app.controller;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping("/redis")
public class RedisController {

    private final RedisTemplate<String, Object> redisTemplate;

    public RedisController(RedisTemplate<String, Object> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    @GetMapping("/keys")
    public Set<String> getAllKeys() {
        return redisTemplate.keys("*");
    }

    @GetMapping("/cache")
    public Map<String, Object> getCacheEntries() {
        Map<String, Object> entries = new HashMap<>();
        Set<String> keys = redisTemplate.keys("profiles::*");

        if (keys != null) {
            for (String key : keys) {
                entries.put(key, redisTemplate.opsForValue().get(key));
            }
        }

        return entries;
    }
}