package com.aardapeker.app.controller;

import com.aardapeker.app.model.Profile;
import com.aardapeker.app.service.ProfileService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/profile")
public class ProfileController {
    private final ProfileService profileService;

    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @GetMapping("/getProfile")
    public ResponseEntity<Profile> getProfile(@RequestParam Long id) {
        Profile profile = profileService.getProfile(id);
        return ResponseEntity.ok(profile);
    }

    @PostMapping("/create")
    public ResponseEntity<Profile> createProfile(@RequestBody Profile profile) {

        return ResponseEntity.ok(profileService.createProfile(profile));
    }
}
