import classes from '../classes.tsx'

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


