import classes from '../classes.tsx'
import {scopeClassName} from '../classes.tsx'

describe(
    'classes',
    () => {
        it('接受一个className', () => {
            const result = classes('a');
            expect(result).toEqual('a')
        })
    }
);

describe(
    'classes',
    () => {
        it('接受2个className', () => {
            const result = classes('a', 'b');
            expect(result).toEqual('a b')
        })
    }
);
describe(
    'classes',
    () => {
        it('接受一个className', () => {
            const result = classes('a', undefined);
            expect(result).toEqual('a')
        })
    }
);
describe(
    'classes',
    () => {
        it('接受多个className', () => {
            const result = classes('a', '哈哈', undefined, null, false);
            expect(result).toEqual('a 哈哈')
        })
    }
);
describe(
    'classes',
    () => {
        it('接受0个className', () => {
            const result = classes();
            expect(result).toEqual('')
        })
    }
);

describe(
    'scopeClass', () => {
        const sc = scopeClassName('yr-layout');
        it('前缀测试,字符串、对象，再多加一个额外的', () => {
            expect(sc('x')).toEqual('yr-layout-x');
            expect(sc()).toEqual('yr-layout');
            expect(sc({x: true})).toEqual('yr-layout-x');
            expect(sc({x: true, y: false})).toEqual('yr-layout-x');
            expect(sc({x: true, y: true})).toEqual('yr-layout-x yr-layout-y');
            expect(sc({x: false, y: true}, 'active')).toEqual('yr-layout-y active');

        });

    }
);
