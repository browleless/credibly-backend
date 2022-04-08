ALTER TABLE `Awardee`
ADD CONSTRAINT `FK_Awardee_organisationId`
  FOREIGN KEY (`organisationId`)
  REFERENCES `User` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

ALTER TABLE `AwardeeGroup`
ADD CONSTRAINT `FK_AwardeeGroup_organisationId`
  FOREIGN KEY (`organisationId`)
  REFERENCES `User` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

ALTER TABLE `AwardeeGroup`
ADD CONSTRAINT `FK_AwardeeGroup_certificateTemplateId`
  FOREIGN KEY (`certificateTemplateId`)
  REFERENCES `CertificateTemplate` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

ALTER TABLE `AwardeeGroupAwardeeIds`
ADD CONSTRAINT `FK_AwardeeGroupAwardeeIds_awardeeGroupId`
  FOREIGN KEY (`awardeeGroupId`)
  REFERENCES `AwardeeGroup` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

ALTER TABLE `AwardeeGroupAwardeeIds`
ADD CONSTRAINT `FK_AwardeeGroupAwardeeIds_awardeeId`
  FOREIGN KEY (`awardeeId`)
  REFERENCES `Awardee` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

ALTER TABLE `CertificateTemplate`
ADD CONSTRAINT `FK_CertificateTemplate_organisationId`
  FOREIGN KEY (`organisationId`)
  REFERENCES `User` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

ALTER TABLE `Document`
ADD CONSTRAINT `FK_Document_organisationId`
  FOREIGN KEY (`organisationId`)
  REFERENCES `User` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;
