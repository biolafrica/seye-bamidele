'use client';

import React from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import { Button } from './Button';

interface PageHeaderProps {
  heading: string;
  subHeading?: string;
  buttonText?: string;
  buttonIcon?: React.ComponentType<{ className?: string }>;
  onButtonClick?: () => void;
  showButton?: boolean;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  heading,
  subHeading,
  buttonText,
  buttonIcon: ButtonIcon = PlusIcon,
  onButtonClick,
  showButton = true,
}) => {
  return (
    <div className="w-full">

      <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-heading tracking-tight">
              {heading}
            </h1>
            {subHeading && (
              <p className="mt-2 text-sm sm:text-base text-secondary">
                {subHeading}
              </p>
            )}
          </div>

          {showButton && buttonText && (
            <div className="flex-shrink-0">
              <Button
                leftIcon={<ButtonIcon className="h-4 w-4" />}
                onClick={onButtonClick}

              >
                {buttonText}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageHeader;