create table "user" ("id" text not null primary key, "name" text not null, "email" text not null unique, "emailVerified" boolean not null, "image" text, "createdAt" date not null, "updatedAt" date not null, "twoFactorEnabled" boolean);

create table "session" ("id" text not null primary key, "expiresAt" date not null, "ipAddress" text, "userAgent" text, "userId" text not null references "user" ("id"));

create table "account" ("id" text not null primary key, "accountId" text not null, "providerId" text not null, "userId" text not null references "user" ("id"), "accessToken" text, "refreshToken" text, "idToken" text, "expiresAt" date, "password" text);

create table "verification" ("id" text not null primary key, "identifier" text not null, "value" text not null, "expiresAt" date not null, "createdAt" date);

create table "passkey" ("id" text not null primary key, "name" text, "publicKey" text not null, "userId" text not null references "user" ("id"), "webauthnUserID" text not null, "counter" integer not null, "deviceType" text not null, "backedUp" boolean not null, "transports" text, "createdAt" date);

create table "twoFactor" ("id" text not null primary key, "secret" text not null, "backupCodes" text not null, "userId" text not null references "user" ("id"))