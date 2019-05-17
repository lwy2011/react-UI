let importAll = (requireContext) => requireContext.keys().forEach(requireContext);
try {
    importAll(require.context("../../icons/", true, /\.svg$/));
} catch (e) {
    // console.log(e)测试不能报错，这个require.context是在某些情况下有的，测试会报错
}