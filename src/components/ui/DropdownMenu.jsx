/* eslint-disable react/jsx-props-no-spreading */
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import React from 'react';
import clsx from 'clsx';
import styles from '@src/components/ui/dropdownMenu.module.scss';

const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

const DropdownMenuContent = React.forwardRef(({ className, sideOffset = 8, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content ref={ref} sideOffset={sideOffset} className={clsx(styles.content, className)} {...props} />
  </DropdownMenuPrimitive.Portal>
));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

const DropdownMenuRadioItem = React.forwardRef(({ children, className, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem ref={ref} className={clsx(styles.radioItem, className)} {...props}>
    <span className={styles.indicator}>
      <DropdownMenuPrimitive.ItemIndicator>✓</DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;

export { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger };
