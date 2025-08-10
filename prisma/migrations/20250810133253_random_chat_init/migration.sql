-- CreateTable
CREATE TABLE `RandomQueue` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `intent` ENUM('AMOUR', 'AMITIE', 'CHAT') NOT NULL DEFAULT 'CHAT',
    `enqueuedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `RandomQueue_userId_key`(`userId`),
    INDEX `RandomQueue_intent_enqueuedAt_idx`(`intent`, `enqueuedAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `RandomQueue` ADD CONSTRAINT `RandomQueue_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
