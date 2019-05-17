import renderer from "react-test-renderer";//快照
import React from "react";
import Icon from '../icon';
import {mount} from 'enzyme'


describe(
    'icon', () => {
        it('是个svg', () => {
            const json = renderer.create(<Icon name="alipay"/>).toJSON();
            expect(json).toMatchSnapshot();
        });
        // it('onClick', function () {
        //     let n = 1;
        //     const fn = () => n = 2;
        //     const node = mount(<Icon name="alipay" onClick={fn}/>);
        //     node.find('svg').simulate('click');
        //     expect(n).toEqual(1);
        // });
        it('onClick', function () {
            const fn = jest.fn();
            const node = mount(<Icon name="alipay" onClick={fn}/>);
            node.find('svg').simulate('click');
            expect(fn).toBeCalled()
        });
    }
);

