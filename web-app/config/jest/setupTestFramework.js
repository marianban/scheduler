import { toBeDisabled } from 'jest-dom/dist/to-be-disabled';
import { toHaveAttribute } from 'jest-dom/dist/to-have-attribute';
import 'jest-dom/extend-expect';
import 'jest-extended';
import { configure } from 'mobx';
import 'react-testing-library/cleanup-after-each';

configure({
  enforceActions: 'always'
});

expect.extend({
  toBeDisabled: element => {
    const disabledResult = toBeDisabled(element);
    const ariaDisabledResult = toHaveAttribute(
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
    return disabledResult;
  }
});
