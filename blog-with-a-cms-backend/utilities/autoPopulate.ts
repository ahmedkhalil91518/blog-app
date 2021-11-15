// eslint-disable-next-line @typescript-eslint/no-explicit-any
 const Populate = (field: unknown) => function ( this: any, next: () => void) {
    this.populate(field);
    next();
  };

  export default Populate