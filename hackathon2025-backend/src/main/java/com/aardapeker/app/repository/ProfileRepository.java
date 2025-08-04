package com.aardapeker.app.repository;

import com.aardapeker.app.model.Profile;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ProfileRepository extends JpaRepository<Profile, Long> {
}
