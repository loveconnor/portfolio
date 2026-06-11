import ButtonLink from '@src/components/animationComponents/buttonLink/Index';
/* eslint-disable react/no-array-index-key */
import clsx from 'clsx';
import styles from '@src/pages/projects/components/projectDetails/styles/projectDetails.module.scss';

function ProjectDetails({ project }) {
  const intro = project.intro || project.desc;

  return (
    <div className={styles.root}>
      <h1 className={clsx(styles.title, 'h3')}>{project.title}</h1>
      <p className={clsx(styles.date, 'h4')}>({project.date})</p>
      <div className={styles.others}>
        <div className={styles.desc}>
          {intro.map((des, index) => (
            <p className="p-l" key={`${project.title}-${index}`}>
              {des}
            </p>
          ))}
        </div>
        {project.liveLink ? (
          <div className={styles.buttonContainer}>
            <ButtonLink target href={project.liveLink} label="VISIT LIVE SITE" />
          </div>
        ) : null}
        {project.githubLink ? (
          <div className={styles.buttonContainer}>
            <ButtonLink target href={project.githubLink} label="VIEW GITHUB" />
          </div>
        ) : null}
      </div>
    </div>
  );
}
export default ProjectDetails;
