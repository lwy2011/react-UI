import {FormRule, newFormData} from "./form";


const Validator =
    (data: newFormData, rules: Array<FormRule>): newFormData => {
        const warning: any = {};
        rules.map(
            rule =>
                !rule.testFn(data[rule.key]) ? (
                    Array.isArray(warning[rule.key]) ?
                        warning[rule.key].push(rule.warning) : warning[rule.key] = [rule.warning]
                ) : warning
        );
        return warning;
    };


export default Validator;