interface ObjectType {
	[key: string]: any;
}

class UtilObject {
	static isEmpty(obj: ObjectType) {
		return Object.keys(obj).length === 0;
	}

	static removeFalsy(params?: any) {
		const copyParam = {
			...params,
		};

		const propNameList = Object.getOwnPropertyNames(copyParam);

		for (let i = 0; i < propNameList.length; i += 1) {
			const propName = propNameList[i];
			if (!!copyParam[propName] === false) {
				delete copyParam[propName];
			}
		}

		return copyParam;
	}
}

export default UtilObject;
