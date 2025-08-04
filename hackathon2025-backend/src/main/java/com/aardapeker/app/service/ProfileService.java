package com.aardapeker.app.service;

import com.aardapeker.app.model.Profile;
import com.aardapeker.app.repository.ProfileRepository;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;


@Service
public class ProfileService {
    public static final String PROFILE_CACHE = "profiles";
    private final ProfileRepository profileRepository;

    public ProfileService(ProfileRepository profileRepository) {
        this.profileRepository = profileRepository;
    }

    @Cacheable(value = "PROFILE_CACHE", key = "#id")
    public Profile getProfile(Long id) {
        return profileRepository.findById(id).orElse(null);
    }

    @CachePut(value = "PROFILE_CACHE", key = "#result.id")
    public Profile createProfile(Profile profile) {
        return profileRepository.save(profile);
    }

    @CachePut(value = "PROFILE_CACHE", key = "#result.id")
    public Profile updateProfile(Profile profile) {
        Long profileId = profile.getId();
        Profile existingProfile = profileRepository.findById(profileId).orElse(null);
        if (existingProfile == null) {
            return null; // or throw an exception
        } else {
            // Update fields as necessary
            existingProfile.setName(profile.getName());
            return profileRepository.save(existingProfile);
        }

    }

    @CacheEvict(value = "PROFILE_CACHE", key = "#id")
    public void deleteProfile(Long id) {
        profileRepository.deleteById(id);
    }
}
