package com.studentappmanager.backend.security;

import com.studentappmanager.backend.security.UserInfo;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

@Repository
public interface UserInfoRepository extends JpaRepository<UserInfo, Integer> {
    Optional<UserInfo> findByEmail(String email); // Use 'email' if that is the correct field for login
}