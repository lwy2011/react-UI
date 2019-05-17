import renderer from "react-test-renderer";
import React from "react";
import Icon from '../icon';

import 'jest';


describe(
    'icon', () => {
        it('是个svg', () => {
            const json = renderer.create(<Icon name="alipay"/>).toJSON();
            expect(json).toMatchSnapshot();
        })
    }
);

