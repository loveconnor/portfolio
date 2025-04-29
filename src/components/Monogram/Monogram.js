import { forwardRef, useId } from 'react';
import { classes } from 'utils/style';
import styles from './Monogram.module.css';

export const Monogram = forwardRef(({ highlight, className, ...props }, ref) => {
  const id = useId();
  const clipId = `${id}monogram-clip`;

  return (
    <svg
      aria-hidden
      className={classes(styles.monogram, className)}
      width="46"
      height="29"
      viewBox="0 0 46 29"
      ref={ref}
      {...props}>
      <defs>
        <clipPath id={clipId}>
          <path d="M25.64,0.1c2.26,0.27,4.78,0.98,6.72,1.9c2.34,1.1,5.2,3.35,5.97,4.71c0.53,0.9,0.34,1.81-0.51,2.53
	c-0.58,0.49-1.23,0.68-2.21,0.65c-1.02-0.03-1.41-0.24-2.56-1.38C31.96,7.41,31.11,6.78,30,6.2c-1.54-0.8-3.13-1.32-4.78-1.56
	c-0.94-0.14-3.09-0.12-4.21,0.04c-2.43,0.35-4.54,1.21-6.21,2.52c-1.82,1.44-3.03,3.16-3.6,5.11c-0.28,0.96-0.35,3.06-0.13,4.04
	c0.92,4.08,4.8,7.18,9.96,7.96c1.08,0.16,3.02,0.17,4.15,0.01c0.98-0.14,2.76-0.6,3.62-0.94c1.56-0.62,3.09-1.67,4.46-3.08
	c0.85-0.87,1.55-1.22,2.5-1.22c1.08,0,2.09,0.49,2.57,1.24c0.25,0.38,0.28,0.52,0.28,1.01c-0.01,0.51-0.05,0.62-0.36,1.1
	c-0.79,1.19-2.43,2.62-4.19,3.67c-3.68,2.19-8.37,3.21-12.98,2.83c-2.58-0.22-5.55-1.06-7.68-2.19c-1.72-0.92-3.36-2.11-4.48-3.26
	c-1.68-1.74-2.86-3.76-3.44-5.97c-0.37-1.38-0.44-3.56-0.15-5.15c0.4-2.25,1.21-3.95,2.79-5.86c2.92-3.52,7.25-5.73,12.47-6.39
	C21.72-0.03,24.49-0.03,25.64,0.1z"/>
        </clipPath>
      </defs>
      <rect clipPath={`url(#${clipId})`} width="100%" height="100%" />
      {highlight && (
        <g clipPath={`url(#${clipId})`}>
          <rect className={styles.highlight} width="100%" height="100%" />
        </g>
      )}
    </svg>
  );
});
