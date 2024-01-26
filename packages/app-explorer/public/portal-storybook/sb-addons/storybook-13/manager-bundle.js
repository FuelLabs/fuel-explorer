try {
  (() => {
    var p = __STORYBOOK_ADDONS__,
      { addons: t, types: f, mockChannel: i } = __STORYBOOK_ADDONS__;
    t.setConfig({ sidebar: { showRoots: !1 } });
  })();
} catch (e) {
  console.error(
    '[Storybook] One of your manager-entries failed: ' + import.meta.url,
    e
  );
}
