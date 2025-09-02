package com.carbackend.dto;

import lombok.*;

@Getter
@AllArgsConstructor
@ToString
@EqualsAndHashCode
public class AccountCredentials
{
    private final String username;
    private final String password;
}
