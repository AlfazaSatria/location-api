-- CreateTable
CREATE TABLE `Province` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `provinceId` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `City` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cityId` VARCHAR(255) NOT NULL,
    `provinceId` VARCHAR(255) NOT NULL,
    `provinceName` VARCHAR(255) NOT NULL,
    `type` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `postalCode` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Subdistrict` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `subdistrictId` VARCHAR(255) NOT NULL,
    `provinceId` VARCHAR(255) NOT NULL,
    `provinceName` VARCHAR(255) NOT NULL,
    `cityId` VARCHAR(255) NOT NULL,
    `cityName` VARCHAR(255) NOT NULL,
    `type` VARCHAR(255) NOT NULL,
    `subdistrictName` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
