import { toBeDisabled, toHaveAttribute } from '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import 'jest-extended';
import { configure } from 'mobx';

configure({
  enforceActions: 'always'
});

expect.extend({
  toBeDisabled: function (element) {
    const disabledResult = toBeDisabled.call(this, element);
    if (element) {
      const ariaDisabledResult = toHaveAttribute.call(this,
        element,
        'aria-disabled',
        'true'
      );
      if (ariaDisabledResult.pass) {
        return {
          ...disabledResult,
          pass: true
        };
      }
    }
    return disabledResult;
  }
});
